import {
  Flex,
  Box,
  Heading,
  Link,
  Text,
  TextField,
  Button,
} from "@radix-ui/themes";
import { useState } from "preact/compat";

function Navbar({ page }) {
  const [search, setSearch] = useState("");
  return (
    <Box>
      <Flex align="center" justify="between" py="3">
        <Heading as="h3" weight="regular">
          All Minecraft Seeds
        </Heading>
        <Flex justify="between" gap="4">
          <form
            onSubmit={e => {
              e.preventDefault();
              if (search) {
                console.log(search)
                const page = BigInt(search) / 25n;
                location.assign(`${location.origin}/${page}`)
              }
            }}>
            <TextField.Root
              size="3"
              placeholder="Enter seed"
              style={{ alignSelf: "center" }}
              onChange={e => setSearch(e.target.value)}></TextField.Root>
          </form>
          <Link
            href={`${location.origin}/${page}`}
            target="_blank"
            style={{ alignSelf: "center" }}>
            Page: {page}
          </Link>
          <Link
            href="https://github.com/nacho-cs/allseeds"
            target="_blank"
            style={{ alignSelf: "center" }}>
            <Text as="span">Github</Text>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export { Navbar };
