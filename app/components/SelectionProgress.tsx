import { Flex, Progress, Text } from "@ritwikdax/uicc";

interface SelectionProgressProps {
  current: number;
  max: number;
}

export default function SelectionProgress({
  current,
  max,
}: SelectionProgressProps) {
  const progress = max > 0 ? (current / max) * 100 : 0;
  const clampedProgress = Math.min(progress, 100);

  const color = current > max ? "red" : progress === 100 ? "green" : "blue";

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="1"
      width="100%"
    >
      <Text size="2" weight="bold" color={current > max ? "red" : undefined}>
        {current} / {max}
      </Text>
      <Progress
        value={clampedProgress}
        max={100}
        size="1"
        color={color}
        style={{ width: "50%" }}
      />
    </Flex>
  );
}
