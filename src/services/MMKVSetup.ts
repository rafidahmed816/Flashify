// src/services/storage/MMKVSetup.ts
import { MMKV } from 'react-native-mmkv';

class MMKVStorage {
  private static instance: MMKV | null = null;

  static initialize(): boolean {
    try {
      if (!MMKVStorage.instance) {
        MMKVStorage.instance = new MMKV({
          id: 'flashcard-vocab-app',
          encryptionKey: 'flashify', // optional
        });
        console.log('✅ MMKV initialized successfully');
      }
      return true;
    } catch (error) {
      console.error('❌ MMKV initialization failed:', error);
      return false;
    }
  }

  static getInstance(): MMKV {
    if (!MMKVStorage.instance) {
      throw new Error('MMKV not initialized. Call MMKVStorage.initialize() first.');
    }
    return MMKVStorage.instance;
  }

  static isReady(): boolean {
    return MMKVStorage.instance !== null;
  }

  // Test MMKV connection
  static testConnection(): boolean {
    try {
      if (!MMKVStorage.isReady()) {
        MMKVStorage.initialize();
      }

      const storage = MMKVStorage.getInstance();
      const testKey = 'mmkv_test_key';
      const testValue = { test: true, timestamp: Date.now() };

      // Write
      storage.set(testKey, JSON.stringify(testValue));

      // Read
      const retrieved = storage.getString(testKey);
      const parsedValue = retrieved ? JSON.parse(retrieved) : null;

      // Delete
      storage.delete(testKey);

      const isSuccess = parsedValue?.test === true;
      console.log(isSuccess ? '✅ MMKV connection test passed' : '❌ MMKV connection test failed');

      return isSuccess;
    } catch (error) {
      console.error('❌ MMKV connection test failed:', error);
      return false;
    }
  }

  static getStorageInfo(): { keys: string[]; size: string } {
    try {
      const storage = MMKVStorage.getInstance();
      const keys = storage.getAllKeys();

      let totalSize = 0;
      keys.forEach((key) => {
        const value = storage.getString(key);
        if (value) {
          totalSize += Buffer.byteLength(value, 'utf8');
        }
      });

      return {
        keys,
        size: `${(totalSize / 1024).toFixed(2)} KB`,
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { keys: [], size: '0 KB' };
    }
  }
}

export { MMKVStorage };
