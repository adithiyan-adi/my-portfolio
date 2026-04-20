import List "mo:core/List";
import Types "types/contact";
import ContactApi "mixins/contact-api";

actor {
  let submissions = List.empty<Types.ContactSubmission>();

  include ContactApi(submissions);
};
