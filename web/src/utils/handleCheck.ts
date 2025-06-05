/**
 * 三元运算符,代码中写太多三元元运算符太丑了
 * @param condition 条件
 * @param trueValue 真值
 * @param falseValue 假值
 * @returns 真值或假值
 */
export const handleCheck = (
  condition: boolean | number | string | null | undefined,
  trueValue: string,
  falseValue = "-"
) => {
  return condition ? trueValue : falseValue;
};
