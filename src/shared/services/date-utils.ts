export class DateUtils {
  static DateBefore(date1: Date, date2: Date): boolean {
    return this.DateComparisonCheck(date1, date2, true, false, false);
  }
  static DateOnOrBefore(date1: Date, date2: Date): boolean {
    return this.DateComparisonCheck(date1, date2, true, false, true);
  }
  static DateAfter(date1: Date, date2: Date): boolean {
    return this.DateComparisonCheck(date1, date2, false, true, false);
  }
  static DateOnOrAfter(date1: Date, date2: Date): boolean {
    return this.DateComparisonCheck(date1, date2, false, true, true);
  }
  static DateOn(date1: Date, date2: Date): boolean {
    return this.DateComparisonCheck(date1, date2, false, false, true);
  }

  private static DateComparisonCheck(
    date1: Date,
    date2: Date,
    ifBefore: boolean,
    ifAfter: boolean,
    ifEqual: boolean
  ): boolean {
    if (date1.getFullYear() < date2.getFullYear()) return ifBefore;
    if (date1.getFullYear() > date2.getFullYear()) return ifAfter;
    // We now know it's the same year
    if (date1.getMonth() < date2.getMonth()) return ifBefore;
    if (date1.getMonth() > date2.getMonth()) return ifAfter;
    // We now know it's the same year
    if (date1.getDate() < date2.getDate()) return ifBefore;
    if (date1.getDate() > date2.getDate()) return ifAfter;
    // We now know it's the same date
    return ifEqual;
  }
}
