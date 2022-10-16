# Entity

An entity in domain-driven design is a rich model element that has a unique identification. For example, we might have an Order entity.  The Order entity has an identifier (like autoincrement bigint). Using that identification, we track the entity and build relations.


## Aggregate
Aggregate is a very specific structure for the domain-driven design.

An aggregate is a group of objects that should be handled together. Every aggregate has an aggregate root. The aggregate root is the main object responsible for the control of the other objects.

Any command or request toward the elements in the aggregate should come through the aggregate root.

In our example, with the food delivery system, such an aggregate is the grouping of Order and OrderItem entities. In this case, the Order entity is the aggregate root. If we want to add a new OrderItem to the Order, we should do it through the aggregate root.

Entities that are “below” the root level should not allow state modification outside the aggregate.

Using aggregates, we strive to achieve an always valid business model.