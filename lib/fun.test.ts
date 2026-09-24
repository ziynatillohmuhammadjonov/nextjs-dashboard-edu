import { fa } from "zod/locales";

function getSum(a: number, b: number): number {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Arguments must be numbers");
  }
  return a + b;
}

it("should return number", () => {
  const sum = getSum(5, 1);
  expect(typeof sum).toBe("number");
});

it("should return concret value", () => {
  const sum = getSum(10, 12);
  expect(sum).toBe(22);
});

it("should throw error for invalide Arguments", () => {
  expect(() => getSum(1, "a" as any)).toThrow("Arguments must be numbers");
});

it("check all syntax testign", () => {
  expect(5).toBe(5); // string number boolean tekshirish uchun
  expect({ a: 1 }).toEqual({ a: 1 }); //array va object tekshirish uchun
  expect([1, 2, 3]).toContain(2); // array ichida borligi tekshiriladi
  expect("salom dunyo").toMatch(/dunyo/); //regexni tekshiradi
  expect(undefined).toBeUndefined();
  expect(null).toBeNull();
  expect(5).not.toBeNull();
  expect(() => 10).toBeDefined(); // qiymat mavjudmi tekshiradi
  expect(() => {
    throw new Error("xato");
  }).toThrow("xato");
});

describe("jest.fn() asoslari", () => {
  it("1) mockReturnValue — oddiy qiymat qaytaradi", () => {
    const fakeFn = jest.fn();
    fakeFn.mockReturnValue(42);

    const result = fakeFn(); // chaqiramiz VA natijani olamiz

    expect(result).toBe(42); // chiqishni tekshiramiz
  });

  it("2) mockResolvedValue — async (Promise) qiymat qaytaradi", async () => {
    const fakeFn = jest.fn();
    fakeFn.mockResolvedValue({ id: 1 });

    const result = await fakeFn(); // await shart!

    expect(result).toEqual({ id: 1 }); // obyekt uchun toEqual
  });

  it("3) mockRejectedValue — xato otadi", async () => {
    const fakeFn = jest.fn();
    fakeFn.mockRejectedValue(new Error("xato"));

    // Promise rad etilishini shunday tekshiramiz:
    await expect(fakeFn()).rejects.toThrow("xato");
  });

  it("4) mock chaqiruvlarni yozib boradi (spy vazifasi)", () => {
    const fakeFn = jest.fn();

    fakeFn("salom"); // 1-chaqiruv
    fakeFn("xayr"); // 2-chaqiruv

    expect(fakeFn).toHaveBeenCalled(); // umuman chaqirildimi
    expect(fakeFn).toHaveBeenCalledTimes(2); // necha marta
    expect(fakeFn).toHaveBeenCalledWith("salom"); // shu argument bilan bo'lganmi
    expect(fakeFn).toHaveBeenLastCalledWith("xayr"); // oxirgisi nima edi
  });
});
