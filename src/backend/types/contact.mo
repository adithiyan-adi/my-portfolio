import Time "mo:core/Time";

module {
  public type Timestamp = Time.Time;

  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    submittedAt : Timestamp;
  };

  public type SubmitResult = {
    #ok : Nat;
    #err : Text;
  };
};
