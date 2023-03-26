export const expToLevel = currentLevel => {
    return currentLevel * 100 * Math.sqrt(currentLevel - 1) + 100
}