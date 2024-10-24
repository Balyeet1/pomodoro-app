"use server"
export async function checkPassword(password: string) {
    if (password === process.env.UPLOAD_PASSWORD) {
        return true
    }
    return false
}