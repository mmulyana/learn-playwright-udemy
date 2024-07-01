Feature: Ecommerce validation

  Scenario: Placing the order
    Given a login to ecommerce application with "mulyan.t20s@gmail.com" and "passworD1@"
    When add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and place the order
    Then Verify order in present in the orderHistory
