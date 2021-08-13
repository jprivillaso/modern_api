import { User } from "../types/user.type"

export const getUserData = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{
        name: 'Juan',
        id: 'user-1'
      }, {
        name: 'Pablo',
        id: 'user-2'
      }])
    }, 3000)
  })
}