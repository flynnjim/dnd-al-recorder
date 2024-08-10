
//console logs for what happens each stage
class User {
    constructor(name, dungeonMasterHours) {
        this.name = typeof name === "undefined" || name === "" ? "user1" : name
        this.dungeonMasterHours = typeof dungeonMasterHours === "undefined" ? 0 : dungeonMasterHours
        this.storage = []
        console.log(`New user ${this.name} has been created with ${this.dungeonMasterHours} dungeon master hours!`)
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
    findCharacter(searchParameter) {
        if (typeof searchParameter === "undefined") { 
            console.log("Invalid input. You must enter a string for the search parameter!")
            return []
        }
        const regex = /`${sear}/
        // https://forum.freecodecamp.org/t/using-template-literal-inside-of-a-regex/454028/2
        //https://stackoverflow.com/questions/494035/how-do-you-use-a-variable-in-a-regular-expression
        for (let i = 0; i<this.storage.length;i++) {
            const curCharacter = this.storage[i]

            if (curCharacter.name === searchParameter || curCharacter.charClass === searchParameter)  {
                return curCharacter
            }

        }
        console.log("Unable to find a character that matches the search parameters.")

    }
    //findcharacter - uses regex to check partial name or character class
    changeName(newName) {
        let oldUsername = this.name
        this.name = newName
        console.log(`User ${oldUsername} changed their username to ${this.name}.`)
    }

    addHours(hours) {
        this.dungeonMasterHours += hours
        console.log(`User ${this.name} has added ${hours} Dungeon Master hours and now has ${this.dungeonMasterHours} Dungeon Master Hours.`)
    }
    spendHours(hours) {
        if (this.dungeonMasterHours - hours >= 0) {
            this.dungeonMasterHours -= hours
            console.log(`User ${this.name} has spent ${hours} Dungeon Master hours and now has ${this.dungeonMasterHours} Dungeon Master Hours.`)
        } else {
            console.log("You do not have enough dungeon master hours for that!")
        }
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
        this.magicItems = []
        this.consumables = []

   
        console.log(`You have created: ${this.name}, a level ${this.level} ${this.charClass} with ${this.downtimeDays} downtime days and ${this.gold} gold.`)

    }
    changeName(newName) {
        const oldName = this.name
        this.name = newName
        console.log(`Character ${oldName} has changed their name to ${this.name}!`)
    }
    updateClass(newClass) {
        const oldClass = this.charClass
        this.charClass = newClass
        console.log(`Character ${this.name} has updated their class from ${oldClass} to ${this.charClass}!`)
    }
    addLevel(levelUps) {
        const prevLevel = this.level
        this.level += typeof levelUps === "undefined" ? 1 : levelUps
        console.log(`Character ${this.name} has leveled up from level ${prevLevel} to level ${this.level}!`)
    }
    addDowntimeDays(daysToAdd) {
        const daysAdding = typeof daysToAdd === "number" ? daysToAdd : 10
        this.downtimeDays += daysAdding
        console.log(`Character ${this.name} has gained ${daysAdding} downtime days and now has ${this.downtimeDays} downtime days!`)
    }
    spendDowntimeDays(daysToSpend) {
        if (typeof daysToSpend !== "number") {
            console.log("You have not entered a number of downtime days to spend!")
        }
        else if (this.downtimeDays - daysToSpend >= 0) {

           this.downtimeDays -= daysToSpend 
           console.log(`Character ${this.name} has spent ${daysToSpend} downtime days and now has ${this.downtimeDays} downtime days!`)
        } else {
            console.log("You do not have enough downtime days for that!")
        }
        
    }
    
    // find character method - part of user character class
    
    // add gold

    //spend gold

    // add permanent magic items

    // trade magical item --> magic item as its own class

    // add consumable magic items

    // trade magic items (maybe just nput one, minus another with third parameter with who tradedwith.)

    // magic item class

    //adventure class - includes all the AL recap info
}

module.exports = {User, Character}