import locales from '@/locales/RU.json';
import { Assessment } from '@/api/FieldOperations/models/Operation';

export default {
  mapAssessment(value) {
    const assessmentName = value !== null ? Assessment[value] : 'NO_RATING';
    return locales[assessmentName] || '';
  }
}
