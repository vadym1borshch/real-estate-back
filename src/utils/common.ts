export const sleep = async (ms: number) =>
  new Promise<void>((resolve) => {
    const id = setTimeout(() => {
      resolve()
      clearTimeout(id)
    }, ms)
  })
