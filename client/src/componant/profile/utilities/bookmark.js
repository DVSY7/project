// client/src/componant/profile/utilities/bookmark.js
export default function bookmark(index, stateArray, setFunc) {
    const newBookmarks = [...stateArray];
    newBookmarks[index] = !newBookmarks[index];
    setFunc(newBookmarks);
}
