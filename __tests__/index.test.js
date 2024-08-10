const {User, Character} = require("../files/index")

describe("dnd al recorder - User and Character classes", () => {
    describe("User class", () => {
        describe("class User initialisation", () => {

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
            it("User initiliased with message stating a new user has been created", () => {
                const logSpy = jest.spyOn(global.console, "log")
                const newUser = new User("Flynn")
                expect(logSpy).toHaveBeenCalledWith("New user Flynn has been created!")
                const newUserTwo = new User("Betty")
                expect(logSpy).toHaveBeenCalledWith("New user Betty has been created!")
                
            })
            it("class User initialised with default DM hours or passed value", () => {
                const newUserOne = new User()
                const newUserTwo = new User("Flynn", 50)
                expect(newUserOne.dungeonMasterHours).toBe(0)
                expect(newUserTwo.dungeonMasterHours).toBe(50)
            })
        })
        describe("accCharacter - User method", () => {

            it("User add character function adds a new caracter to storage", () => {
                const newUser = new User()
                newUser.addCharacter()
                newUser.addCharacter("Wolby Wizzle", "Circle of Moon Druid", 10, 20, 13500)
                expect(newUser.storage[0]).toBeInstanceOf(Character)
            })
            it("add character method sends message that character has been created", () => {
                const newUser = new User("Flynn")
                const logSpy = jest.spyOn(global.console, "log")
                newUser.addCharacter("Randy Garlic", "Divine Soul Sorcerer", 10, 40, 5000)
                expect(logSpy).toHaveBeenCalledWith("You have created: Randy Garlic, a level 10 Divine Soul Sorcerer with 40 downtime days and 5000 gold.")
                newUser.addCharacter("Wolby", "Druid", 10, 30, 500)
                expect(logSpy).toHaveBeenCalledWith("You have created: Wolby, a level 10 Druid with 30 downtime days and 500 gold.")
            })
        })
        describe("genericNum - User method", () => {

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
            })
        })
        describe.only("findCharacter - User method to find character with input of character name or class", () => {
            it("User has findCharacter method", () => {
                const newUser = new User()
                expect(typeof newUser.findCharacter).toBe("function")
            })
            it("returns an empty array if passed no name", () => {
                const newUser = new User()
                newUser.addCharacter("Randy Garlic")
                expect(newUser.findCharacter()).toEqual([])
            })
            it("sends user message if not passed valid input or cannot find a character", () => {
                const logSpy = jest.spyOn(global.console, "log")
            })
            it("findCharacter returns character based on exact name passed for 1 character stored", () => {
                const newUser = new User()
                newUser.addCharacter("Randy Garlic")
                expect(newUser.findCharacter("Randy Garlic")).toEqual(newUser.storage[0])
            })
            it("findCharacter returns character based on exact name passed for multiple character stored", () => {
                const newUser = new User()
                newUser.addCharacter("Wolby")
                newUser.addCharacter("Randy Garlic")
                expect(newUser.findCharacter("Randy Garlic")).toEqual(newUser.storage[1])
            })
        })
        describe("changeName - User method", () => {

            it("changeName - method to change user name", () => {
                const newUser = new User()
                newUser.changeName("Flynn")
                expect(newUser.name).toBe("Flynn")
            })
            it("changeName method sends message detailing changes", () => {
                const newUser = new User("Betty")
                const logSpy = jest.spyOn(global.console, "log")
                newUser.changeName("Flynn")
                expect(logSpy).toHaveBeenCalledWith("User Betty changed their username to Flynn.")
                newUser.changeName("Lyra")
                expect(logSpy).toHaveBeenCalledWith("User Flynn changed their username to Lyra.")
            })
        })
        describe("addHours - User function", () => {

            it("addHours - method adds dungeon master hours", () => {
                const newUser = new User()
                newUser.addHours(10)
                expect(newUser.dungeonMasterHours).toBe(10)
            })
            it("addHours sends user message with details added and new balance", () => {
                const newUser = new User("Flynn", 10)
                const logSpy = jest.spyOn(global.console, "log")
                newUser.addHours(10)
                expect(logSpy).toHaveBeenCalledWith("User Flynn has added 10 Dungeon Master hours and now has 20 Dungeon Master Hours.")
                newUser.changeName("Michael")
                newUser.addHours(25)
                expect(logSpy).toHaveBeenCalledWith("User Michael has added 25 Dungeon Master hours and now has 45 Dungeon Master Hours.")
            })
        })
        describe("spendHours - User method", () => {

            it("spendHours - reduces dungeon master hours, unless not enough hours in which case error message", () => {
                const newUser = new User()
                const logSpy = jest.spyOn(global.console, "log")
                newUser.addHours(10)
                newUser.spendHours(5)
                expect(newUser.dungeonMasterHours).toBe(5)
                newUser.spendHours(10)
                expect(newUser.dungeonMasterHours).toBe(5)
                expect(logSpy).toHaveBeenCalledWith("You do not have enough dungeon master hours for that!")
            })
            it("spendHours - sends user message of the changes made", () => {
                const newUser = new User("Flynn", 50)
                const logSpy = jest.spyOn(global.console, "log")
                newUser.spendHours(15)
                expect(logSpy).toHaveBeenCalledWith("User Flynn has spent 15 Dungeon Master hours and now has 35 Dungeon Master Hours.")
                newUser.changeName("Betty")
                newUser.spendHours(20)
                expect(logSpy).toHaveBeenCalledWith("User Betty has spent 20 Dungeon Master hours and now has 15 Dungeon Master Hours.")
            })
        })
    })
    describe("Character class", () => {
        describe("Character class initialisation", () => {

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
            it("character initialised with empty array of permanent magic items", () => {
                const newUser = new User()
                newUser.addCharacter("Randy")
                expect(Array.isArray(newUser.storage[0].magicItems)).toBe(true)
                expect(newUser.storage[0].magicItems).toEqual([])
            })
            it("character initialised with empty array of consumable magic items", () => {
                const newUser = new User
                newUser.addCharacter()
                expect(newUser.storage[0].consumables).toEqual([])
                expect(Array.isArray(newUser.storage[0].consumables)).toBe(true)
            })
        })
        describe("changeName - Character method", () => {

            it("changeName - changes character name", () => {
                const newChar = new Character()
                newChar.changeName("Wolby")
                expect(newChar.name).toBe("Wolby")
            })
            it("changeName - sends message to user with details of change", () => {
                const logSpy = jest.spyOn(global.console, "log")
                const newUser = new User()
                newUser.addCharacter("Randy Garlic")
                newUser.storage[0].changeName("Wolby")
                expect(logSpy).toHaveBeenCalledWith("Character Randy Garlic has changed their name to Wolby!")
            })
        })
        describe("updateClass - Character method", () => {

            it("updateClass - changes class of character with input argument", () => {
                const newChar = new Character("Randy Garlic", "Monk", 10, 50, 10000)
                newChar.updateClass("Divine Soul Sorcerer")
                expect(newChar.charClass).toBe("Divine Soul Sorcerer")
            })
            it("updateClass - sends message to user detailing changes made", () => {
                const logSpy = jest.spyOn(global.console, "log")
                const newUser = new User()
                newUser.addCharacter("Randy Garlic", "Sorcerer")
                newUser.storage[0].updateClass("Divine Soul Sorcerer")
                expect(logSpy).toHaveBeenCalledWith("Character Randy Garlic has updated their class from Sorcerer to Divine Soul Sorcerer!")
            })
        })
        describe("addLevel - Character method", () => {

            it("addLevel - adds a singl level if invoked without an argument, or the number if passed an argument", () => {
                const newChar = new Character("Randy Garlic", "Sorcerer")
                newChar.addLevel()
                expect(newChar.level).toBe(2)
                newChar.addLevel(8)
                expect(newChar.level).toBe(10)
            })
            it("addLevel - sends user message with details of level up", () => {
                const logSpy = jest.spyOn(global.console, "log")
                const newUser = new User()
                newUser.addCharacter("Randy Garlic", "Sorcerer")
                newUser.storage[0].addLevel()
                newUser.storage[0].addLevel(5)
                expect(logSpy).toHaveBeenCalledWith("Character Randy Garlic has leveled up from level 1 to level 2!")
                expect(logSpy).toHaveBeenCalledWith("Character Randy Garlic has leveled up from level 2 to level 7!")
            })
        })
        describe("addDowntimeDays - Character method", () => {

            it("addDowntimeDays - adds donwtime days, default value or number passed", () => {
                const newChar = new Character("Ghrag Rak Iron Fingers", "Way of Mercy Monk")
                newChar.addDowntimeDays()
                expect(newChar.downtimeDays).toBe(10)
                newChar.addDowntimeDays(5)
                expect(newChar.downtimeDays).toBe(15)
            })
            it("addDowntimeDays", () => {
                const logSpy = jest.spyOn(global.console, "log")
                const newUser = new User()
                newUser.addCharacter("Randy Garlic", "Sorcerer")
                newUser.storage[0].addDowntimeDays()
                newUser.storage[0].addDowntimeDays(5)
                expect(logSpy).toHaveBeenCalledWith("Character Randy Garlic has gained 10 downtime days and now has 10 downtime days!")
                expect(logSpy).toHaveBeenCalledWith("Character Randy Garlic has gained 5 downtime days and now has 15 downtime days!")
            })
        })
        describe("spendDowntimeDays - character Method", () => {

            it("spendDowntimeDays - removes downtime days based on passed arguments. Error message of there are not enough downtime days", () => {
                const newChar = new Character("Greqial Klaqa Rikkaarr", "Circle of Moon Druid", 10, 30, 6000)
                newChar.spendDowntimeDays(20)
                expect(newChar.downtimeDays).toBe(10)
                const logSpy = jest.spyOn(global.console, "log")
                newChar.spendDowntimeDays(20)
                expect(logSpy).toHaveBeenCalledWith("You do not have enough downtime days for that!")   
            })
            it("spendDowntimeDays - sneds user message detailing changes to downtime days and alerts user if they have not specified a number of downtime days", () => {
                const newChar = new Character("Greqial Klaqa Rikkaarr", "Circle of Moon Druid", 10, 30, 6000)
                const logSpy = jest.spyOn(global.console, "log")
                newChar.spendDowntimeDays(20)
                newChar.spendDowntimeDays(5)
                expect(logSpy).toHaveBeenCalledWith("Character Greqial Klaqa Rikkaarr has spent 20 downtime days and now has 10 downtime days!")   
                expect(logSpy).toHaveBeenCalledWith("Character Greqial Klaqa Rikkaarr has spent 5 downtime days and now has 5 downtime days!")  
                newChar.spendDowntimeDays()
                expect(logSpy).toHaveBeenCalledWith("You have not entered a number of downtime days to spend!")        
            })
        })
    })
})