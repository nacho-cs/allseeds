function seedToParts(seed) {
  const lower48Mask = (1n << 48n) - 1n;
  const upper16Mask = ((1n << 16n) - 1n) << 48n;
  const lower48Bits = seed & lower48Mask;
  const isolatedUpper16 = seed & upper16Mask;
  const upper16Bits = isolatedUpper16 >> 48n;
  console.log(
    upper16Bits.toString(16).padStart(4, "0"),
    lower48Bits.toString(16).padStart(12, "0")
  );
}

console.log(seedToParts(-1950884254474434485n));
