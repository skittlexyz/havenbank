export function redirectUser(currentHref) {
    window.location.href = "/dashboard"
}

export function formatMoney(value, signal = null){
    return (signal ? signal : "") + "R$" + String(value.toFixed(2)).replace(".", ",");
}