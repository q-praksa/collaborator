export const colourStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles: any) => {
        return {
            ...styles,
            backgroundColor: 'lightblue',
            color: 'black',
            cursor: 'pointer',
        };
    },
};
