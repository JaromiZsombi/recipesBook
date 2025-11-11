import React from 'react'

export const SignUp = () => {
  return (
    <div className='signupBase'>
            <form action="">
                <label for="fname">First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="Your name.."></input>

                    <label for="lname">Last Name</label>
                    <input type="text" id="lname" name="lastname" placeholder="Your last name.."></input>
            </form>
        </div>
  )
}