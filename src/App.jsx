import { SeedTable } from "./SeedTable.jsx";
import { Navbar } from "./Navbar.jsx";
import { Container, Flex } from "@radix-ui/themes";
import { useHotkeys } from "react-hotkeys-hook";
import { useState } from "preact/compat";

export function App({ defaultPage }) {
  const [page, setPage] = useState(defaultPage ? BigInt(defaultPage) : 0n);
  useHotkeys("down", () => setPage(prev => prev + 1n));
  useHotkeys("up", () => setPage(prev => prev - 1n));

  return (
    <Container
      onWheel={e => {
        if (e.deltaY > 0) {
          setPage(prev => prev + 1n);
        } else {
          setPage(prev => prev - 1n);
        }
      }}>
      <Flex direction="column" gap="6">
        <Navbar page={page} />
        <SeedTable page={page} />
      </Flex>
    </Container>
  );
}
