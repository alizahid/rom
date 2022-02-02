import * as SecureStore from 'expo-secure-store'

class Storage {
  async get<T>(key: string): Promise<T | undefined> {
    const value = await SecureStore.getItemAsync(key)

    if (value) {
      return JSON.parse(value)
    }
  }

  async put<T>(key: string, value: T): Promise<Storage> {
    await SecureStore.setItemAsync(key, JSON.stringify(value))

    return this
  }

  async remove(key: string): Promise<Storage> {
    await SecureStore.deleteItemAsync(key)

    return this
  }
}

export const storage = new Storage()
