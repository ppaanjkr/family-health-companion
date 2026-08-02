export function getExpenseCycleDisplayName(
    month:number,
    year:number,
){
    return new Date(
        year,
        month-1,
    ).toLocaleDateString(
        "th-TH",
        {
            month:"long",
            year:"numeric",
        },
    );
}