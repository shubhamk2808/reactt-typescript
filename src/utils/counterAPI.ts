// A mock function to mimic making an async request for data
import {userData} from './MOCK_DATA'

export function fetchUsers() {
  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: userData }), 5000)
  );
}
