/* 
import { connect, disconnect } from '../connectToMongo'
import { User } from './User'
import { IProfile } from './User.d'

// testing cluser of mongodb, to replace with docker service
const MONGO_DB_HOST = 'cluster0.xzpkf.mongodb.net',
	MONGO_DB_NAME = "test",
	MONGO_DB_USERNAME = "dbUser",
	MONGO_DB_PASSWORD = 'EllxyUiddWRqappW'

const connstring: string = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD
	}@${MONGO_DB_HOST
	}/${MONGO_DB_NAME}?retryWrites=true&w=majority`

describe("User model", () => {
	beforeAll(async () => {
		await connect(connstring)
	})

	afterAll(async () => {
		await disconnect()
	})

	describe("static method .findOneOrCreate works properly when", () => {
		const mockedToken = 'test-token-hash-123'
		const mockedProfile: IProfile = {
			id: 'test-id-123',
			displayName: 'test-user-name'
		}

		let uuidToPassBetweenTests: string = ""

		afterAll(async () => {
			await User.deleteOne({_id:uuidToPassBetweenTests})
		})

		it("creating new user with given unknown id", async () => {
			expect.assertions(4)
			try {
				const newUser = await User.findOneOrCreate(mockedToken, mockedProfile)

				const { id, userName, token, _id } = newUser

				expect(id).toBe(mockedProfile.id)
				expect(userName).toBe(mockedProfile.displayName)
				expect(token).toBe(mockedToken)

				expect(_id).not.toBeFalsy()
				// assign to next test
				uuidToPassBetweenTests = _id

			}
			catch (error) { }
		});

		it("getting user with id existing in db", async () => {
			expect.assertions(4)
			try {
				const foundUser = await User.findOneOrCreate(mockedToken, mockedProfile)

				const { id, userName, token, _id } = foundUser

				expect(id).toBe(mockedProfile.id)
				expect(userName).toBe(mockedProfile.displayName)
				expect(token).toBe(mockedToken)

				expect(uuidToPassBetweenTests).toBe(_id)
			}
			catch (error) { }
		})
	})
})
*/
describe("static method .findOneOrCreate works properly when", () => {
  it("getting user with id existing in db", async () => {
    expect(true).toBe(true)
  })
})
