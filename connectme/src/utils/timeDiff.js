const timeDiff = (time) => {
    const diff = new Date().getTime() - new Date(time).getTime();


    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let result;
    if(days > 0) {
        result = `${days} days`
    } else if(hours > 0) {
        result = `${hours} hours`
    } else if (minutes > 0) {
        result = `${minutes} minutes`
    } else if(seconds > 0) {
        result = `${seconds} seconds`
    }

    return result;
}

export default timeDiff;