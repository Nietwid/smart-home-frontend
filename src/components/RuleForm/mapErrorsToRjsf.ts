import { ErrorSchema } from "@rjsf/utils";

type Errors = {
    actions: Record<string, Record<string, string>>[];
};

export default function mapErrorsToRjsf(errors: Errors):ErrorSchema {
    const extraErrors: ErrorSchema = {};

    if (!errors?.actions || !Array.isArray(errors.actions)) {
        return extraErrors;
    }

    errors.actions.forEach((action) => {
        const settings = action["extra_settings"];

        if (settings && typeof settings === 'object') {
            Object.entries(settings).forEach(([field, message]) => {
                (extraErrors as any)[field] = {
                    __errors: [message]
                };
            });
        }
    });

    return extraErrors;
}