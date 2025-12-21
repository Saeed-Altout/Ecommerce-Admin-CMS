export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto py-10">
        <p className="text-center text-xs text-muted-foreground font-medium">
          © {new Date().getFullYear()} Vendo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
