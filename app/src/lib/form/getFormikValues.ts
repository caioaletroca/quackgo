import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import pick from 'lodash/pick';

/**
 * Merge initial values and API resources into a proper safer object to formik forms
 * @param initialValues
 * @param data
 * @param keys
 * @returns
 */
export default function getFormikValues<T = unknown>(
	initialValues: T,
	data: unknown,
	keys: string[]
) {
	return Object.assign({}, initialValues, pick(omitBy(data as object, isNil), keys)) as T;
}