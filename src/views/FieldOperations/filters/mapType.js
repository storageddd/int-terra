import locales from '@/locales/RU.json';
import { OperationType } from '@/api/FieldOperations/models/Operation';

export default {
  mapType(value) {
    const operationType = OperationType[value];
    return locales[operationType] || '';
  }
}
