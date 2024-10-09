Feature: Automatic renewal of policy

Background:
  Given I am logged in to PolicyCenter as Super user
  And I am using an existing completed account
  And I have a policy
  And the policy type is Renewing
  And the term type is Annual
  And the policy expiration date is 10 days in the future
  And the policy has a coverage of type Milk
  And the policy has a coverage of type General Farm Contents

@PC_DF_014
Scenario: Policy renewal for Buildings and Contents
  Given the policy defined in the background
  When I start the batch renew process and return to PolicyCenter
  Then the policy is renewed
