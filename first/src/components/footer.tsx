import React from "react";

export default function Footer() {
  return (
    <footer className="border-t py-6 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} Ansh Jain. All rights reserved.
    </footer>
  );
}
