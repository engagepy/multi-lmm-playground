import type { Metadata } from "next";
import { NextPage } from "next";
import "@/styles/globals.css";
import ReduxProvider from '@/redux/redux-provider';
import Layout from "@/layout";


export const metadata: Metadata = {
  title: "M37Labs AI Playground",
  description: "Open Graph setting",
};

type Props = Readonly<{
  children: React.ReactNode;
}>

const RootLayout: NextPage<Props> = ({ children }: Props) => {
  return (
    <html lang="en" className="dark">
      <body className={`antialiased`} suppressHydrationWarning>
        <ReduxProvider>
          <Layout>
            {children}
          </Layout>
        </ReduxProvider>
      </body>
    </html>
  );
}

export default RootLayout;