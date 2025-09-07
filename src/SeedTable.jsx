import { useState } from "preact/compat";
import { Table, Link } from "@radix-ui/themes";

const TWO_POW_64 = 1n << 64n; // 2^64
const MAX_SIGNED_64 = (1n << 63n) - 1n; // 2^63 - 1
const MIN_SIGNED_64 = -(1n << 63n); // -2^63

function wrapAroundSigned64(seedValue) {
  let wrappedSeed = seedValue % TWO_POW_64;
  if (wrappedSeed < 0n) {
    wrappedSeed += TWO_POW_64;
  }
  if (wrappedSeed > MAX_SIGNED_64) {
    wrappedSeed -= TWO_POW_64;
  }
  return wrappedSeed;
}

function upper16(seed) {
  const upper16Mask = ((1n << 16n) - 1n) << 48n;
  const isolatedUpper16 = seed & upper16Mask;
  return isolatedUpper16 >> 48n;
}

function lower48(seed) {
  const lower48Mask = (1n << 48n) - 1n;
  return seed & lower48Mask;
}

function createArray(pageNum) {
  const page = BigInt(pageNum);
  const lowest = -(1n << 63n);
  let seedArr = [];
  for (let i = 0n; i < 25n; i++) {
    seedArr.push(wrapAroundSigned64(page * 25n + i));
  }
  seedArr = seedArr.map(seed => {
    return {
      seed,
      upper16: upper16(seed).toString(16).padStart(4, "0"),
      lower48: lower48(seed).toString(16).padStart(12, "0"),
    };
  });
  return seedArr;
}

export const SeedTable = ({ page }) => {
  // Row Data: The data to be displayed.
  const rowData = createArray(page);
  console.log(rowData);

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell
            width="33%"
            align="center"
            style={{ verticalAlign: "middle" }}>
            Seed
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell
            width="33%"
            align="center"
            style={{ verticalAlign: "middle" }}>
            Upper 16
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell
            width="33%"
            align="center"
            style={{ verticalAlign: "middle" }}>
            Lower 48
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rowData.map(row => {
          return (
            <Table.Row>
              <Table.Cell
                align="center"
                style={{ verticalAlign: "middle", height: "1.57rem" }}>
                <Link
                  href={`https://mcseedmap.net/1.21.5-Java/${row.seed}`}
                  target="_blank">
                  {row.seed}
                </Link>
              </Table.Cell>
              <Table.Cell
                align="center"
                style={{ verticalAlign: "middle", height: "1.57rem" }}>
                {row.upper16}
              </Table.Cell>
              <Table.Cell
                align="center"
                style={{ verticalAlign: "middle", height: "1.57rem" }}>
                {row.lower48}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};
