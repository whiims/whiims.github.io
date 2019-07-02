const popup = document.getElementsByClassName("popup")[0]
const twitterButton = document.getElementById("twitter")
const facebookButton = document.getElementById("facebook")


twitterButton.addEventListener('mouseover', function() {
    popup.classList.toggle('share-open')
})
twitterButton.addEventListener('mouseout', function() {
    popup.classList.toggle('share-open')
})

facebookButton.addEventListener('mouseover', function() {
    popup.classList.toggle('share-open')
})
facebookButton.addEventListener('mouseout', function() {
    popup.classList.toggle('share-open')
})
