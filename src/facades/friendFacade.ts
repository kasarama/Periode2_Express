import { IFriend, IFriendDTO } from "../interfaces/IFriend";
import { Db, Collection } from "mongodb";
import bcrypt from "bcryptjs";
import { ApiError } from "../errors/apiErrors";
import Joi, { string, ValidationError } from "joi";
console.log("In facade");
const BCRYPT_ROUNDS = 10;

const USER_INPUT_SCHEMA = Joi.object({
  firstName: Joi.string().min(2).max(40).required(),
  lastName: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(4).max(30).required(),
  email: Joi.string().email().required(),
});

class FriendsFacade {
  db: Db;
  friendCollection: Collection;

  constructor(db: Db) {
    this.db = db;
    this.friendCollection = db.collection("friends");
  }

  /**
   *
   * @param friend
   * @throws ApiError if validation fails
   */
  async addFriend(friend: IFriend): Promise<{ id: string }> {
    const status = USER_INPUT_SCHEMA.validate(friend);
    if (status.error) {
      throw new ApiError(status.error.message, 400);
    }
    const hashedpw = await bcrypt.hash(friend.password, BCRYPT_ROUNDS);
    const f = { ...friend, password: hashedpw };
    let id;
    try {
      const result = await this.friendCollection.insertOne(f);
      id = result.insertedId;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }

    return { id };
  }

  /**
   * TODO
   * @param email
   * @param friend
   * @throws ApiError if validation fails or friend was not found
   */
  async editFriend(
    email: string,
    friend: IFriend
  ): Promise<{ modifiedCount: number }> {
    const status = USER_INPUT_SCHEMA.validate(friend);
    if (status.error) {
      throw new ApiError(status.error.message, 400);
    }
    const hashedpw = await bcrypt.hash(friend.password, BCRYPT_ROUNDS);
    const f = { ...friend, password: hashedpw };

    //TODO ######################################
    throw new Error("COMPLETE THIS METHOD");
    // #########################################
  }

  /**
   *
   * @param friendEmail
   * @returns true if deleted otherwise false
   */
  async deleteFriend(friendEmail: string): Promise<boolean> {
    //TODO #####################################
    throw new Error("COMPLETE THIS METHOD");
    // #########################################
  }

  async getAllFriends(): Promise<Array<IFriend>> {
    const users: unknown = await this.friendCollection.find({}).toArray();
    return users as Array<IFriend>;
  }

  /**
   *
   * @param friendEmail
   * @returns
   * @throws ApiError if not found
   */
  async getFriend(friendEmail: string): Promise<IFriendDTO> {
    const result = await this.friendCollection
      .find({ email: friendEmail })
      .toArray();

    const userDTO = fToDTO(result[0]);
    if ((result.length = 0)) {
      throw new ApiError("COMPLETE THIS METHOD", 404);
    }

    return userDTO;
  }

  /**
   * Use this method for authentication
   * @param friendEmail
   * @param password
   * @returns the user if he could be authenticated, otherwise null
   */
  async getVerifiedUser(
    friendEmail: string,
    password: string
  ): Promise<IFriend | null> {
    const friend: IFriend = await this.friendCollection.findOne({
      email: friendEmail,
    });
    if (friend && (await bcrypt.compare(password, friend.password))) {
      return friend;
    }
    return Promise.resolve(null);
  }
}
function fToDTO(friend: any) {
  const fdto: IFriendDTO = {
    id: friend._id,
    name: friend.firstName,
    email: friend.email,
  };
  return fdto;
}
export default FriendsFacade;
