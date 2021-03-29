export const calculateReusedFairings = (data)=>{
    let reusedCount = 0;
    data.forEach(launch => {
        if(launch.fairings &&  launch.fairings.reused){
            reusedCount++
        }
    });
    return reusedCount;
}