export const calculateBoostersLanded = (data)=>{
    let dataWithoutUpcoming = data.filter((launch) => !launch.upcoming)
    let count = 0;
    dataWithoutUpcoming.forEach((item)=>{
        item.cores.forEach((core)=>{
            if(core.landing_success){
                count++
            }
        })
    })
    return count;
}