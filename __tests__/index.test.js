const {User, Character} = require("../files/index")

describe("dnd al recorder", () => {
    describe("User class", () => {
        it("class User name initiliased with argument passed or default if not passed a value", () => {
            const newUser = new User()
            expect(newUser.name).toBe("new user1")
            const newUserTwo = new User("Flynn")
            expect(newUserTwo.name).toBe("Flynn")
        })
        it("class User initilaised with storage initiliased as empty array", () => {
            const newUser = new User()
            expect(Array.isArray(newUser.storage)).toBe(true)
            expect(newUser.storage).toEqual([])

        })
        it("class User initialised with default DM hours or passed value", () => {
            const newUserOne = new User()
            const newUserTwo = new User("Flynn", 50)
            expect(newUserOne.dungeonMasterHours).toBe(0)
            expect(newUserTwo.dungeonMasterHours).toBe(50)
        })
        it("User add character function adds a new caracter to storage", () => {
            const newUser = new User()
            newUser.addCharacter()
            newUser.addCharacter("Wolby Wizzle", "Circle of Moon Druid", 10, 20, 13500)
            expect(newUser.storage[0]).toBeInstanceOf(Character)
        })
        it("genericNum - calculate method for number of generic characters", () => {
            const newUser = new User()
            newUser.addCharacter("Randy Garlic", "Divine Soul Sorcerer")
            newUser.addCharacter()
            expect(newUser.genericNum()).toBe(1)
            newUser.addCharacter()
            expect(newUser.genericNum()).toBe(2)
            newUser.addCharacter()
            newUser.addCharacter()
            expect(newUser.genericNum()).toBe(4)
            newUser.addCharacter("Wolby Wizzle", "Circle of Moon Druid", 10, 20, 13500)
            expect(newUser.genericNum()).toBe(4)
            newUser.addCharacter("Randy Garlic", "Divine Soul Sorcerer")
            expect(newUser.genericNum()).toBe(4)

        })
        it("generiNum method used to change characters name generated", () => {
            const newUser = new User()
            newUser.addCharacter()
            newUser.addCharacter()
            newUser.addCharacter()
            newUser.addCharacter()
            expect(newUser.storage[1].name).toBe("character2")
            expect(newUser.storage[2].name).toBe("character3")
            expect(newUser.storage[3].name).toBe("character4")
            console.log(newUser.storage)

        })
        it("changeName - method to change user name", () => {
            const newUser = new User()
            newUser.changeName("Flynn")
            expect(newUser.name).toBe("Flynn")
        })
    })
    describe("Character class", () => {
        it("class Character initialised with default values for name and character class", () => {
            const newChar = new Character()
            expect(newChar.name).toBe("character1")
            expect(newChar.charClass).toBe("commoner")
        })
        it("takes passed arguments for name and class", () => {
            const newChar = new Character("Randy Garlic", "Divine Soul Sorcerer")
            expect(newChar.name).toBe("Randy Garlic")
            expect(newChar.charClass).toBe("Divine Soul Sorcerer")
        })
        it("initialises with default values for gold, level and downtime days, or takes passed arguments", () => {
            const newCharOne = new Character()
            expect(newCharOne.gold).toBe(0)
            expect(newCharOne.downtimeDays).toBe(0)
            expect(newCharOne.level).toBe(1)
            const newCharTwo = new Character("Wolby Wizzle", "Circle of Moon Druid", 10, 20, 13500)
            expect(newCharTwo.level).toBe(10)
            expect(newCharTwo.downtimeDays).toBe(20)
            expect(newCharTwo.gold).toBe(13500)
        })
    })


})