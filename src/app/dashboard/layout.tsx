import HeaderDashboard from "./components/headerDashboard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  <HeaderDashboard />
            {children}
        </>;
}
