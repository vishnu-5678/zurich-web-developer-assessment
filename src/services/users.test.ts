import { matchesAssessmentFilter } from './users';

describe('matchesAssessmentFilter', () => {
  it('matches first names beginning with G', () => {
    expect(matchesAssessmentFilter({ first_name: 'George', last_name: 'Smith' })).toBe(true);
  });

  it('matches last names beginning with W', () => {
    expect(matchesAssessmentFilter({ first_name: 'Alice', last_name: 'Washington' })).toBe(true);
  });

  it('is case insensitive and ignores surrounding whitespace', () => {
    expect(matchesAssessmentFilter({ first_name: ' gina ', last_name: 'smith' })).toBe(true);
  });

  it('rejects non-matching users', () => {
    expect(matchesAssessmentFilter({ first_name: 'Alice', last_name: 'Smith' })).toBe(false);
  });
});
