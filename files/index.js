
class User {
    constructor(name, dungeonMasterHours) {
        this.name = typeof name === "undefined" ? "new user1" : name
        this.dungeonMasterHours = typeof dungeonMasterHours === "undefined" ? 0 : dungeonMasterHours
        this.storage = []
    }
    addCharacter(name, charClass, level, downtimeDays, gold) {
        const genNum = this.genericNum()
        const newChar = new Character(name, charClass, level, downtimeDays, gold, genNum)
        this.storage.push(newChar)
    }
    genericNum() {  
        const regex = /character/
        const genericArray = this.storage.filter((character) => regex.test(character.name))
        return genericArray.length

    }
    changeName(name) {
        this.name = name
    }
} 

class Character {
    constructor(name, charClass, level, downtimeDays, gold, genNum) {
        const generiNum = typeof genNum === "undefined" ? 0 : genNum
        this.name = typeof name === "undefined" ? `character${generiNum + 1}` : name
        this.charClass = typeof charClass === "undefined" ? "commoner" : charClass
        this.level = typeof level === "undefined" ? 1 : level
        this.downtimeDays = typeof downtimeDays === "undefined" ? 0 : downtimeDays
        this.gold = typeof gold === "undefined" ? 0 : gold

    }
}

module.exports = {User, Character}