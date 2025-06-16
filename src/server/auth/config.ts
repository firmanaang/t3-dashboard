import { PrismaAdapter } from "@auth/prisma-adapter";
import type { SIWESession } from "@reown/appkit-siwe";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import {
  getAddressFromMessage,
  getChainIdFromMessage,
  verifySignature,
} from "@reown/appkit-siwe";

import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends SIWESession {
    user: {
      id: string;
      walletAddress: string;
      chainId: number;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const nextAuthSecret = process.env.AUTH_SECRET;
if (!nextAuthSecret) {
  throw new Error("AUTH_SECRET is not set");
}

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID is not set");
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Credentials({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.message) {
            throw new Error("SiweMessage is undefined");
          }
          const { message, signature } = credentials;
          const address = getAddressFromMessage(message);
          const chainId = getChainIdFromMessage(message);

          const isValid = await verifySignature({
            address,
            message,
            signature,
            chainId,
            projectId,
          });

          if (isValid) {
            let user = await prisma.user.findUnique({
              where: {
                walletAddress: address.toLowerCase(),
              },
            });

            if (!user) {
              user = await prisma.user.create({
                data: {
                  walletAddress: address.toLowerCase(),
                },
              });
            }

            return {
              id: `${chainId}:${address}`,
            };
          }

          return null;
        } catch (e) {
          return null;
        }
      },
    }),
    DiscordProvider,
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session({ session, token }) {
      if (!token.sub) {
        return session;
      }

      const [, chainId, address] = token.sub.split(":");
      if (chainId && address) {
        session.address = address;
        session.chainId = parseInt(chainId, 10);
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
