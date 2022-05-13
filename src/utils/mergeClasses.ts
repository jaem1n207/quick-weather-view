// @description 클래스를 병합합니다
export function mergeClasses(...values: (string | false)[]) {
  const deduped = (values.filter(Boolean) as string[]).reduce((set, x) => {
    x.split(' ').forEach((y) => {
      set.add(y);
    });

    return set;
  }, new Set<string>());

  return Array.from(deduped).join(' ');
}
