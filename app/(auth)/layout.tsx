const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-gray-100 dark:bg-gray-950 flex items-center justify-center py-6 px-4">
      {children}
    </main>
  );
};

export default AuthLayout;
