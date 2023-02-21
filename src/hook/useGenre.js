const useGenres=(selectedGenres)=>{
    if (selectedGenres<1) {
        return ""
    } else {
        let genres = selectedGenres.map((genre)=>{
        return genre['id'].toString()
    })
    return genres
    }
    
}
export default useGenres