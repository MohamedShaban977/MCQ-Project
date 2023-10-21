import { state, style, trigger } from "@angular/animations";

export const ToggleIsLoading = trigger('isLoading',
    [
        state('normalState', style(
            {
                width: 200,
                height: 45,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
            })),
        state('loadingState', style(
            {
                width: 45,
                height: 45,
                borderRadius: 50,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
            })),


    ]);