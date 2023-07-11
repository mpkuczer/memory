export function levelToBoardSize(level) {
  return level > 15 ? 8 : Math.floor(level / 3) + 3
}

export function levelToPatternSize(level) {
  return level + 2
}

export function getRandomIndices(level) {
  let nums = Array.from(Array(levelToBoardSize(level)*levelToBoardSize(level)).keys())
  let res = []
  for (let i = 0; i < levelToPatternSize(level); i++) {
    const randIndex = Math.floor(Math.random()*nums.length)
    res.push(nums[randIndex])
    nums.splice(randIndex, 1)
  }
  return res.map((n) => [Math.floor(n / levelToBoardSize(level)), n % levelToBoardSize(level)])
}

export function emptyBoard(level) {
  return Array(levelToBoardSize(level)).fill(Array(levelToBoardSize(level)).fill(null))
}

export function getRandomPattern(level) {
  const patternIndices = getRandomIndices(level)
  return emptyBoard(level).map((row, _i) => {
    return row.map((_, _j) => {
      const square = patternIndices.reduce((acc, [i, j]) => {
        return acc || (i == _i && j == _j)
      }, false)
      return square === false ? null : square
    })
  })
}
