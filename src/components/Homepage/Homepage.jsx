import React from "react";

export const Homepage = () => {
  return (
    <div className="container mx-auto grid">
      {/* left sidebar */}
      <aside>
        <div>left sidebar content</div>
      </aside>
      {/* main content */}
      <main>
        <div>main blog content</div>
      </main>
      {/* right sidebar content */}
      <aside>
        <div>right sidebar content</div>
      </aside>
    </div>
  );
};
