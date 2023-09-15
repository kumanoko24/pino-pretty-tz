'use strict'

module.exports = formatTime

const dateformat = require('dateformat')
const createDate = require('./create-date')
const isValidDate = require('./is-valid-date')

/**
 * Converts a given `epoch` to a desired display format.
 *
 * @param {number|string} epoch The time to convert. May be any value that is
 * valid for `new Date()`.
 * @param {boolean|string} [translateTime=false] When `false`, the given `epoch`
 * will simply be returned. When `true`, the given `epoch` will be converted
 * to a string at UTC using the `DATE_FORMAT` constant. If `translateTime` is
 * a string, the following rules are available:
 *
 * - `<format string>`: The string is a literal format string. This format
 * string will be used to interpret the `epoch` and return a display string
 * at UTC.
 * - `SYS:STANDARD`: The returned display string will follow the `DATE_FORMAT`
 * constant at the system's local timezone.
 * - `SYS:<format string>`: The returned display string will follow the given
 * `<format string>` at the system's local timezone.
 * - `UTC:<format string>`: The returned display string will follow the given
 * `<format string>` at UTC.
 *
 * @returns {number|string} The formatted time.
 */
function formatTime (epoch, translateTime = false) {
  if (translateTime === false) {
    return epoch
  }

  const instant = createDate(epoch)

  // If the Date is invalid, do not attempt to format
  if (!isValidDate(instant)) {
    return epoch
  }

  return dateformat(instant, 'isoDateTime')
}
