using System.ComponentModel.DataAnnotations;

namespace VewTech.AutoTime.Library.Models;

/// <summary>
/// Model class for user-created schedules.
/// </summary>
public class Schedule
{
    /// <summary>
    /// The name will be "default".
    /// <para>The IdSchedule property will be a
    /// randomly generated Guid.</para>
    /// </summary>
    public Schedule()
    {
        IdSchedule = Guid.NewGuid();
        Name = "default";
    }

    /// <summary>
    /// <para>The IdSchedule property will be a
    /// randomly generated Guid.</para>
    /// </summary>
    /// <param name="name">The name to be assigned
    /// to the new Schedule.</param>
    public Schedule(string name) : this()
    {
        Name = name;
    }

    /// <summary>
    /// The unique Guid for the Schedule.
    /// </summary>
    [Required]
    public Guid IdSchedule { get; set; }

    /// <summary>
    /// The common name for the Schedule.
    /// </summary>
    [Required]
    public string Name { get; set; }

    /// <summary>
    /// List of <see cref="ClockingAction">ClockingAction</see>
    /// that the Schedule will perform.
    /// </summary>
    public List<ClockingAction> Clockings { get; set; } = new List<ClockingAction>();

    /// <summary>
    /// Variation, in minutes, that the <see cref="ClockingAction"/>
    /// will have.
    /// </summary>
    [Range(1, int.MaxValue)]
    public int MinutesVariation { get; set; } = 1;
}